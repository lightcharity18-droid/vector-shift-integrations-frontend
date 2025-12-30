import { useState } from 'react';
import {
    Box,
    Autocomplete,
    TextField,
    Grid,
    Typography,
    Paper,
    Divider
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { AirtableIntegration } from './integrations/airtable';
import { NotionIntegration } from './integrations/notion';
import { HubSpotIntegration } from './integrations/hubspot';
import { DataForm } from './data-form';
import { ConfigSection } from './components/ConfigSection';

const integrationMapping = {
    'Notion': NotionIntegration,
    'Airtable': AirtableIntegration,
    'HubSpot': HubSpotIntegration,
};

const StyledTextField = styled(TextField)(({ theme }) => ({
    '& .MuiOutlinedInput-root': {
        borderRadius: '8px',
        '&:hover fieldset': {
            borderColor: '#2a5298',
        },
    }
}));

export const IntegrationForm = () => {
    const [integrationParams, setIntegrationParams] = useState({});
    const [user, setUser] = useState('TestUser');
    const [org, setOrg] = useState('TestOrg');
    const [currType, setCurrType] = useState(null);
    const CurrIntegration = integrationMapping[currType];

    return (
        <Box sx={{ py: 4 }}>
            <Box sx={{ mb: 4, textAlign: 'center' }}>
                <Typography
                    variant="h4"
                    sx={{
                        fontWeight: 700,
                        color: '#1e3c72',
                        mb: 1,
                    }}
                >
                    Integration Manager
                </Typography>
                <Typography
                    variant="body1"
                    color="text.secondary"
                    sx={{ maxWidth: '600px', mx: 'auto' }}
                >
                    Connect and manage your third-party integrations in one place.
                    Configure authentication and sync data seamlessly.
                </Typography>
            </Box>

            <ConfigSection title="Configuration">
                <Grid container spacing={3}>
                    <Grid item xs={12} md={6}>
                        <StyledTextField
                            fullWidth
                            label="User ID"
                            value={user}
                            onChange={(e) => setUser(e.target.value)}
                            placeholder="Enter your user ID"
                        />
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <StyledTextField
                            fullWidth
                            label="Organization ID"
                            value={org}
                            onChange={(e) => setOrg(e.target.value)}
                            placeholder="Enter your organization ID"
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <Autocomplete
                            id="integration-type"
                            options={Object.keys(integrationMapping)}
                            value={currType}
                            renderInput={(params) => (
                                <StyledTextField
                                    {...params}
                                    label="Select Integration"
                                    placeholder="Choose an integration to connect"
                                />
                            )}
                            onChange={(e, value) => {
                                setCurrType(value);
                                if (!value) {
                                    setIntegrationParams({});
                                }
                            }}
                            sx={{
                                '& .MuiOutlinedInput-root': {
                                    borderRadius: '8px',
                                }
                            }}
                        />
                    </Grid>
                </Grid>
            </ConfigSection>

            {currType && (
                <Box sx={{ mb: 3 }}>
                    <CurrIntegration
                        user={user}
                        org={org}
                        integrationParams={integrationParams}
                        setIntegrationParams={setIntegrationParams}
                    />
                </Box>
            )}

            {integrationParams?.credentials && (
                <Box>
                    <DataForm
                        integrationType={integrationParams?.type}
                        credentials={integrationParams?.credentials}
                    />
                </Box>
            )}
        </Box>
    );
}
