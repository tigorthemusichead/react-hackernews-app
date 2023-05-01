import {AppBar, Box, Button, Container, Toolbar, useTheme} from "@mui/material";
import {ReactNode} from "react";
import HomeIcon from '@mui/icons-material/Home';
import {useNavigate} from "react-router-dom";

interface LayoutPorops {
    children: ReactNode
}

const Layout = ({children}: LayoutPorops) => {
    const theme = useTheme()
    const navigate = useNavigate();
    return (
        <Box sx={{
            background: theme.palette.grey["100"],
        }}>
            <AppBar position="static">
                <Toolbar>
                        <Button
                            onClick={()=>{
                                navigate("/")
                            }}
                            startIcon={<HomeIcon/> }
                            color={"inherit"}
                        >
                            Home
                        </Button>
                </Toolbar>
            </AppBar>
            <Container sx={{
                marginTop: "50px",
                minHeight: "calc(100vh - 110px)",
                padding: "10px"
            }}>
                {children}
            </Container>
        </Box>
    )
}

export default Layout;