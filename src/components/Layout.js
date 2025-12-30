import { Box, Container, AppBar, Toolbar, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';

const StyledAppBar = styled(AppBar)(({ theme }) => ({
    background: 'linear-gradient(135deg, #1e3c72 0%, #2a5298 100%)',
    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
}));

const MainContent = styled(Box)(({ theme }) => ({
    minHeight: '100vh',
    background: 'linear-gradient(to bottom, #f5f7fa 0%, #e8edf2 100%)',
    paddingTop: theme.spacing(3),
    paddingBottom: theme.spacing(6),
}));

export const Layout = ({ children }) => {
    return (
        <>
            <StyledAppBar position="static">
                <Toolbar>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                        <Box sx={{
                            width: 40,
                            height: 40,
                            borderRadius: '8px',
                            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontWeight: 700,
                            fontSize: '1.2rem',
                            color: 'white'
                        }}>
                            VS
                        </Box>
                        <Typography variant="h6" component="div" sx={{ fontWeight: 600, letterSpacing: '0.5px' }}>
                            VectorShift Integrations
                        </Typography>
                    </Box>
                </Toolbar>
            </StyledAppBar>
            <MainContent>
                <Container maxWidth="lg">
                    {children}
                </Container>
            </MainContent>
        </>
    );
};
