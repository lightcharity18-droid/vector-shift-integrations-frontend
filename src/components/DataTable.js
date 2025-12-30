import { useState } from 'react';
import {
    Box,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Typography,
    Chip,
    IconButton,
    Collapse,
    Alert
} from '@mui/material';
import { styled } from '@mui/material/styles';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';

const StyledTableContainer = styled(TableContainer)(({ theme }) => ({
    borderRadius: '12px',
    boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
    border: '1px solid #e8edf2',
    maxHeight: '600px',
}));

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    fontWeight: 600,
    background: '#f8fafc',
    color: '#1e3c72',
    borderBottom: '2px solid #e8edf2',
}));

const Row = ({ row, index }) => {
    const [open, setOpen] = useState(false);

    return (
        <>
            <TableRow
                sx={{
                    '&:hover': { background: '#f8fafc' },
                    cursor: 'pointer',
                    transition: 'background 0.2s'
                }}
                onClick={() => setOpen(!open)}
            >
                <TableCell>
                    <IconButton size="small">
                        {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                    </IconButton>
                </TableCell>
                <TableCell>
                    <Chip
                        label={`#${index + 1}`}
                        size="small"
                        sx={{ fontWeight: 600 }}
                    />
                </TableCell>
                <TableCell>{row.id || 'N/A'}</TableCell>
                <TableCell>{row.name || row.title || 'N/A'}</TableCell>
                <TableCell>
                    <Chip
                        label={row.type || 'Unknown'}
                        size="small"
                        color="primary"
                        variant="outlined"
                    />
                </TableCell>
            </TableRow>
            <TableRow>
                <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={5}>
                    <Collapse in={open} timeout="auto" unmountOnExit>
                        <Box sx={{ margin: 2, padding: 2, background: '#f8fafc', borderRadius: '8px' }}>
                            <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 2 }}>
                                Full Details
                            </Typography>
                            <pre style={{
                                fontSize: '0.85rem',
                                overflow: 'auto',
                                padding: '12px',
                                background: 'white',
                                borderRadius: '6px',
                                border: '1px solid #e8edf2'
                            }}>
                                {JSON.stringify(row, null, 2)}
                            </pre>
                        </Box>
                    </Collapse>
                </TableCell>
            </TableRow>
        </>
    );
};

export const DataTable = ({ data }) => {
    if (!data || data.length === 0) {
        return (
            <Alert severity="info" sx={{ borderRadius: '12px' }}>
                No data to display. Click "Load Data" to fetch integration data.
            </Alert>
        );
    }

    return (
        <StyledTableContainer component={Paper}>
            <Table stickyHeader>
                <TableHead>
                    <TableRow>
                        <StyledTableCell width="50px" />
                        <StyledTableCell width="80px">Index</StyledTableCell>
                        <StyledTableCell>ID</StyledTableCell>
                        <StyledTableCell>Name</StyledTableCell>
                        <StyledTableCell>Type</StyledTableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {data.map((row, index) => (
                        <Row key={row.id || index} row={row} index={index} />
                    ))}
                </TableBody>
            </Table>
        </StyledTableContainer>
    );
};
