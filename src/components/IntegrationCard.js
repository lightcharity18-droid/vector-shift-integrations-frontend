import { Card, CardContent, Typography, Box, Chip } from '@mui/material';
import { styled } from '@mui/material/styles';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

const StyledCard = styled(Card)(({ theme }) => ({
    borderRadius: '12px',
    boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
    transition: 'all 0.3s ease',
    border: '1px solid #e8edf2',
    background: 'white',
    '&:hover': {
        transform: 'translateY(-4px)',
        boxShadow: '0 8px 24px rgba(0,0,0,0.12)',
    }
}));

const integrationIcons = {
    'Notion': '📝',
    'Airtable': '📊',
    'HubSpot': '🚀',
};

const integrationColors = {
    'Notion': '#2eaadc',
    'Airtable': '#fcb400',
    'HubSpot': '#ff7a59',
};

export const IntegrationCard = ({ title, description, isConnected, onConnect, isConnecting, children }) => {
    const icon = integrationIcons[title] || '🔗';
    const color = integrationColors[title] || '#1976d2';

    return (
        <StyledCard>
            <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', mb: 2 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                        <Box sx={{
                            fontSize: '2rem',
                            width: 48,
                            height: 48,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            borderRadius: '10px',
                            background: `${color}15`,
                        }}>
                            {icon}
                        </Box>
                        <Box>
                            <Typography variant="h6" sx={{ fontWeight: 600, mb: 0.5 }}>
                                {title}
                            </Typography>
                            {description && (
                                <Typography variant="body2" color="text.secondary">
                                    {description}
                                </Typography>
                            )}
                        </Box>
                    </Box>
                    {isConnected && (
                        <Chip
                            icon={<CheckCircleIcon />}
                            label="Connected"
                            color="success"
                            size="small"
                            sx={{ fontWeight: 600 }}
                        />
                    )}
                </Box>
                {children}
            </CardContent>
        </StyledCard>
    );
};
