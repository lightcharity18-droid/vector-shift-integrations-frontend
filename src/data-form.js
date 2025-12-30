import { useState } from 'react';
import {
    Box,
    Alert,
    Snackbar,
    Typography,
    Divider
} from '@mui/material';
import axios from 'axios';
import { DataTable } from './components/DataTable';
import { StyledButton } from './components/StyledButton';
import { ConfigSection } from './components/ConfigSection';

const endpointMapping = {
    'Notion': 'notion',
    'Airtable': 'airtable',
    'HubSpot': 'hubspot',
};

export const DataForm = ({ integrationType, credentials }) => {
    const [loadedData, setLoadedData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [successMessage, setSuccessMessage] = useState(null);
    const endpoint = endpointMapping[integrationType];

    const handleLoad = async () => {
        try {
            setLoading(true);
            setError(null);
            const formData = new FormData();
            formData.append('credentials', JSON.stringify(credentials));
            const response = await axios.post(`http://localhost:8000/integrations/${endpoint}/load`, formData);
            const data = response.data;

            let parsedData = data;
            if (typeof data === 'string') {
                try {
                    parsedData = JSON.parse(data);
                } catch (e) {
                    parsedData = [{ raw: data }];
                }
            }

            if (!Array.isArray(parsedData)) {
                parsedData = [parsedData];
            }

            setLoadedData(parsedData);
            setSuccessMessage(`Successfully loaded ${parsedData.length} items from ${integrationType}`);
        } catch (e) {
            setError(e?.response?.data?.detail || 'Failed to load data. Please try again.');
        } finally {
            setLoading(false);
        }
    }

    const handleClear = () => {
        setLoadedData(null);
        setError(null);
        setSuccessMessage('Data cleared successfully');
    }

    return (
        <ConfigSection title="Data Management">
            <Box sx={{ mb: 3 }}>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                    Load and view data from your {integrationType} integration.
                </Typography>
                <Box sx={{ display: 'flex', gap: 2 }}>
                    <StyledButton
                        onClick={handleLoad}
                        variant='contained'
                        loading={loading}
                        disabled={!credentials}
                    >
                        Load Data
                    </StyledButton>
                    {loadedData && (
                        <StyledButton
                            onClick={handleClear}
                            variant='outlined'
                        >
                            Clear Data
                        </StyledButton>
                    )}
                </Box>
            </Box>

            {error && (
                <Alert severity="error" sx={{ mb: 2, borderRadius: '8px' }} onClose={() => setError(null)}>
                    {error}
                </Alert>
            )}

            {loadedData && (
                <>
                    <Divider sx={{ my: 3 }} />
                    <Box>
                        <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 2 }}>
                            Integration Data ({loadedData.length} items)
                        </Typography>
                        <DataTable data={loadedData} />
                    </Box>
                </>
            )}

            <Snackbar
                open={!!successMessage}
                autoHideDuration={3000}
                onClose={() => setSuccessMessage(null)}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
            >
                <Alert severity="success" sx={{ borderRadius: '8px' }}>
                    {successMessage}
                </Alert>
            </Snackbar>
        </ConfigSection>
    );
}
