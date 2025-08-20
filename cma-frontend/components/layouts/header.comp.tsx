'use client'
import * as React from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MuiAppBar from '@mui/material/AppBar';
import IconButton from '@mui/material/IconButton';
import Toolbar from '@mui/material/Toolbar';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import { Avatar, Icon, Link, Menu, MenuItem } from '@mui/material';
import { Bars3Icon, ChevronDoubleLeftIcon, PowerIcon, UserIcon } from '@heroicons/react/16/solid';
import { UserCircleIcon } from '@heroicons/react/24/solid';
import { ButtonIcon } from '../button/button-icon.comp';
import { useRouter } from 'next/navigation';
import { getSessionLocal, ROLE_STUDENT, SESSION_LOCAL_STORAGE_KEY } from '@/base/uitls';
import { useMutation } from '@tanstack/react-query';
import { authApis } from '@/base/apis/auth.api';
import { showAlertError } from '@/base/ui/toaster';
import { ButtonIconText } from '../button/buton-iconText.comp';

const AppBar = styled(MuiAppBar)(({ theme }) => ({
  borderWidth: 0,
  borderBottomWidth: 0.5,
  borderStyle: 'solid',
  borderColor: theme.palette.divider,
  boxShadow: 'none',
  zIndex: theme.zIndex.drawer + 1,
}));

const LogoContainer = styled('div')({
  position: 'relative',
  height: 40,
  display: 'flex',
  alignItems: 'center',
  '& img': {
    maxHeight: 40,
  },
});

export interface HeaderProps {
  logo?: React.ReactNode;
  title?: string;
  menuOpen: boolean;
  onToggleMenu: (open: boolean) => void;
}

export default function Header({
  logo,
  title,
  menuOpen,
  onToggleMenu,
}: HeaderProps) {
  const router = useRouter();
  const theme = useTheme();
 const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
const { mutate, isPending } = useMutation({
        mutationFn: authApis.logout,
        onError: (error) => {
            console.error('Error calling api:', error);
            showAlertError(error.message)

        },
        onSuccess: (data) => {
          localStorage.removeItem(SESSION_LOCAL_STORAGE_KEY)
          router.push('/login')
        },
    });

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleMenuOpen = React.useCallback(() => {
    onToggleMenu(!menuOpen);
  }, [menuOpen, onToggleMenu]);

  const getMenuIcon = React.useCallback(
    (isExpanded: boolean) => {
      const expandMenuActionText = 'Expand';
      const collapseMenuActionText = 'Collapse';

      return (
        <Tooltip
          title={`${isExpanded ? collapseMenuActionText : expandMenuActionText} menu`}
          enterDelay={1000}
        >
          <div>
            <IconButton
              size="small"
              aria-label={`${isExpanded ? collapseMenuActionText : expandMenuActionText} navigation menu`}
              onClick={handleMenuOpen}
            >
              {!isExpanded ? <Icon sx={{ justifyContent: 'center', alignContent: 'center' }} >
                    <Bars3Icon width={20} height={20} color="primary" />
                </Icon>
                 : <Icon sx={{ justifyContent: 'center', alignContent: 'center' }} >
                    <ChevronDoubleLeftIcon width={20} height={20} color="primary" />
                </Icon>}
            </IconButton>
          </div>
        </Tooltip>
      );
    },
    [handleMenuOpen],
  );

  return (
    <AppBar color="inherit" position="absolute" sx={{ displayPrint: 'none' }}>
      <Toolbar sx={{ backgroundColor: 'inherit',}}>
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          sx={{
            flexWrap: 'wrap',
            width: '100%',
          }}
        >
          <Stack direction="row" alignItems="center">
            <Box sx={{ mr: 1 }}>{getMenuIcon(menuOpen)}</Box>
            <Link style={{ textDecoration: 'none' }}>
              <Stack direction="row" alignItems="center">
                {logo ? <LogoContainer>{logo}</LogoContainer> : null}
                {title ? (
                  <Typography
                    variant="h6"
                    sx={{
                      color: (theme.vars ?? theme).palette.primary.main,
                      fontWeight: '700',
                      ml: 1,
                      whiteSpace: 'nowrap',
                      lineHeight: 1,
                    }}
                  >
                    {title}
                  </Typography>
                ) : null}
              </Stack>
            </Link>
          </Stack>
            <Stack direction="row" alignItems="center">
              <Tooltip title="Open settings">
              <IconButton onClick={handleMenu} size='large' sx={{ p: 0 }}>
                <Avatar
            alt={'example'}
            src=""
            sx={{ width: 40, height: 40, margin: "0 auto" }}
          />
              </IconButton>
            </Tooltip>
                <Menu
                 sx={{ mt: '45px' }}
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                {getSessionLocal()?.role === ROLE_STUDENT &&
                <MenuItem onClick={() => router.push('/student/profile')}>
                  <ButtonIconText buttonProps={{ variant: 'text', color: 'inherit'}} iconComp={<UserIcon height={20} width={20}/>} title='Profile'/>
                </MenuItem>}
                <MenuItem onClick={() => mutate()}>
                  <ButtonIconText buttonProps={{loading: isPending, variant: 'text', color: 'inherit'}} iconComp={<PowerIcon height={20} width={20}/>} title='Logout'/>
                </MenuItem>
              </Menu>
            </Stack>
            </Stack>
      </Toolbar>
    </AppBar>
  );
}