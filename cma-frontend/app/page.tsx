import { Box, CircularProgress } from "@mui/material";
import UtmPage from "./utm";

export default function Home() {
  return<Box
            sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "100vh",
                bgcolor: "rgba(255,255,255,0.7)",
            }}
        >
            <svg width={0} height={0}>
                <defs>
                    <linearGradient id="my_gradient" x1="0%" y1="0%" x2="0%" y2="100%">
                        <stop offset="0%" stopColor="#e01cd5" />
                        <stop offset="100%" stopColor="#1CB5E0" />
                    </linearGradient>
                </defs>
            </svg>
            <CircularProgress size={60} thickness={4} sx={{ 'svg circle': { stroke: 'url(#my_gradient)' } }} />
            <UtmPage/>
        </Box>
}
