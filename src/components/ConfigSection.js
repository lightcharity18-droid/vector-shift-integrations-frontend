import { Paper, Typography, Box } from '@mui/material';
import { styled } from '@mui/material/styles';

const StyledPaper = styled(Paper)(({ theme }) => ({
    padding: theme.spacing(3),
    borderRadius: '12px',
    boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
    border: '1px solid #e8edf2',
    background: 'white',
    marginBottom: theme.spacing(3),
}));

export const ConfigSection = ({ title, children }) => {
    return (
        <StyledPaper>
            <Typography
                variant="h6"
                sx={{
                    fontWeight: 600,
                    mb: 2,
                    color: '#1e3c72',
                    fontSize: '1.1rem'
                }}
            >
                {title}
            </Typography>
            <Box>{children}</Box>
        </StyledPaper>
    );
};
