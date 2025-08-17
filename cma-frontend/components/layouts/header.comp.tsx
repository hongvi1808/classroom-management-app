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
import { Icon, Link } from '@mui/material';
import { Bars3Icon, ChevronDoubleLeftIcon, ChevronDoubleRightIcon } from '@heroicons/react/16/solid';

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
  const theme = useTheme();

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
      <Toolbar sx={{ backgroundColor: 'inherit', mx: { xs: -0.75, sm: -1 } }}>
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
        </Stack>
      </Toolbar>
    </AppBar>
  );
}