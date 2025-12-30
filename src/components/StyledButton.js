import { Button, CircularProgress } from '@mui/material';
import { styled } from '@mui/material/styles';

const GradientButton = styled(Button)(({ theme, variant }) => ({
    borderRadius: '8px',
    padding: '10px 24px',
    fontWeight: 600,
    textTransform: 'none',
    fontSize: '0.95rem',
    boxShadow: variant === 'contained' ? '0 4px 12px rgba(30, 60, 114, 0.2)' : 'none',
    transition: 'all 0.3s ease',
    '&:hover': {
        transform: 'translateY(-2px)',
        boxShadow: variant === 'contained' ? '0 6px 16px rgba(30, 60, 114, 0.3)' : 'none',
    }
}));

export const StyledButton = ({ loading, children, ...props }) => {
    return (
        <GradientButton
            {...props}
            disabled={loading || props.disabled}
        >
            {loading ? <CircularProgress size={20} color="inherit" /> : children}
        </GradientButton>
    );
};
