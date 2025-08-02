const transactionService = require('./TransactionService');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const moment = require('moment');

const app = express();
const port = process.env.PORT || 8080;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

// Health Check
app.get('/health', (req, res) => {
    res.status(200).json({ 
        status: 'healthy',
        timestamp: moment().unix() 
    });
});

// ADD TRANSACTION
app.post('/transaction', async (req, res) => {
    const timestamp = moment().unix();
    try {
        const { amount, description } = req.body;
        
        // Validate input
        if (amount === undefined || !description) {
            return res.status(400).json({ 
                message: 'Amount and description are required',
                timestamp
            });
        }

        await transactionService.addTransaction(amount, description);
        
        console.log(JSON.stringify({
            timestamp,
            level: 'INFO',
            message: 'Added expense',
            amount,
            description
        }));

        res.status(201).json({ 
            message: 'Transaction added successfully',
            timestamp
        });
    } catch (err) {
        console.error(JSON.stringify({
            timestamp,
            level: 'ERROR',
            message: 'Add transaction failed',
            error: err.message
        }));
        
        res.status(500).json({ 
            message: 'Failed to add transaction',
            timestamp
        });
    }
});

// GET ALL TRANSACTIONS
app.get('/transactions', async (req, res) => {
    const timestamp = moment().unix();
    try {
        const transactions = await transactionService.getAllTransactions();
        
        console.log(JSON.stringify({
            timestamp,
            level: 'INFO',
            message: 'Retrieved all expenses',
            count: transactions.length
        }));

        res.status(200).json({
            transactions,
            timestamp
        });
    } catch (err) {
        console.error(JSON.stringify({
            timestamp,
            level: 'ERROR',
            message: 'Get transactions failed',
            error: err.message
        }));
        
        res.status(500).json({ 
            message: 'Failed to get transactions',
            timestamp
        });
    }
});

// DELETE ALL TRANSACTIONS
app.delete('/transactions', async (req, res) => {
    const timestamp = moment().unix();
    try {
        await transactionService.deleteAllTransactions();
        
        console.log(JSON.stringify({
            timestamp,
            level: 'INFO',
            message: 'Deleted all expenses'
        }));

        res.status(200).json({ 
            message: 'All transactions deleted successfully',
            timestamp
        });
    } catch (err) {
        console.error(JSON.stringify({
            timestamp,
            level: 'ERROR',
            message: 'Delete all transactions failed',
            error: err.message
        }));
        
        res.status(500).json({ 
            message: 'Failed to delete transactions',
            timestamp
        });
    }
});

// GET SINGLE TRANSACTION
app.get('/transaction/:id', async (req, res) => {
    const timestamp = moment().unix();
    try {
        const id = parseInt(req.params.id);
        if (isNaN(id) {
            return res.status(400).json({ 
                message: 'Invalid transaction ID',
                timestamp
            });
        }

        const transaction = await transactionService.findTransactionById(id);
        
        if (!transaction) {
            return res.status(404).json({ 
                message: 'Transaction not found',
                timestamp
            });
        }

        res.status(200).json({
            transaction,
            timestamp
        });
    } catch (err) {
        console.error(JSON.stringify({
            timestamp,
            level: 'ERROR',
            message: `Get transaction ${req.params.id} failed`,
            error: err.message
        }));
        
        res.status(500).json({ 
            message: 'Failed to get transaction',
            timestamp
        });
    }
});

// DELETE SINGLE TRANSACTION
app.delete('/transaction/:id', async (req, res) => {
    const timestamp = moment().unix();
    try {
        const id = parseInt(req.params.id);
        if (isNaN(id)) {
            return res.status(400).json({ 
                message: 'Invalid transaction ID',
                timestamp
            });
        }

        const deleted = await transactionService.deleteTransactionById(id);
        
        if (!deleted) {
            return res.status(404).json({ 
                message: 'Transaction not found',
                timestamp
            });
        }

        console.log(JSON.stringify({
            timestamp,
            level: 'INFO',
            message: `Deleted transaction ${id}`
        }));

        res.status(200).json({ 
            message: `Transaction ${id} deleted successfully`,
            timestamp
        });
    } catch (err) {
        console.error(JSON.stringify({
            timestamp,
            level: 'ERROR',
            message: `Delete transaction ${req.params.id} failed`,
            error: err.message
        }));
        
        res.status(500).json({ 
            message: 'Failed to delete transaction',
            timestamp
        });
    }
});

// Not Found Handler
app.use((req, res) => {
    const timestamp = moment().unix();
    res.status(404).json({ 
        message: 'Route not found',
        timestamp
    });
});

// Global Error Handler
app.use((err, req, res, next) => {
    const timestamp = moment().unix();
    console.error(JSON.stringify({
        timestamp,
        level: 'ERROR',
        message: 'Unhandled application error',
        error: err.message
    }));
    
    res.status(500).json({ 
        message: 'Internal server error',
        timestamp
    });
});

app.listen(port, () => {
    const timestamp = moment().unix();
    console.log(JSON.stringify({
        timestamp,
        level: 'INFO',
        message: `Server started on port ${port}`
    }));
});