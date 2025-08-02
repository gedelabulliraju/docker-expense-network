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
    res.status(200).json({ status: 'healthy' });
});

// ADD TRANSACTION
app.post('/transaction', async (req, res) => {
    try {
        const { amount, description } = req.body;
        
        if (!amount || !description) {
            return res.status(400).json({ message: 'Amount and description are required' });
        }

        await transactionService.addTransaction(amount, description);
        
        const timestamp = moment().unix();
        console.log({ 
            timestamp,
            message: 'Adding Expense',
            amount,
            description
        });

        res.status(201).json({ message: 'Transaction added successfully' });
    } catch (err) {
        console.error('Transaction Error:', err);
        res.status(500).json({ message: 'Failed to add transaction', error: err.message });
    }
});

// GET ALL TRANSACTIONS
app.get('/transactions', async (req, res) => {
    try {
        const transactions = await transactionService.getAllTransactions();
        
        const timestamp = moment().unix();
        console.log({ 
            timestamp,
            message: 'Retrieved All Expenses',
            count: transactions.length
        });

        res.status(200).json(transactions);
    } catch (err) {
        console.error('Get Transactions Error:', err);
        res.status(500).json({ message: 'Failed to get transactions', error: err.message });
    }
});

// DELETE ALL TRANSACTIONS
app.delete('/transactions', async (req, res) => {
    try {
        await transactionService.deleteAllTransactions();
        
        const timestamp = moment().unix();
        console.log({ 
            timestamp,
            message: 'Deleted All Expenses'
        });

        res.status(200).json({ message: 'All transactions deleted successfully' });
    } catch (err) {
        console.error('Delete All Error:', err);
        res.status(500).json({ message: 'Failed to delete transactions', error: err.message });
    }
});

// DELETE SINGLE TRANSACTION
app.delete('/transaction/:id', async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        if (isNaN(id)) {
            return res.status(400).json({ message: 'Invalid transaction ID' });
        }

        const result = await transactionService.deleteTransactionById(id);
        
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Transaction not found' });
        }

        console.log(`Deleted transaction with id ${id}`);
        res.status(200).json({ message: `Transaction ${id} deleted successfully` });
    } catch (err) {
        console.error('Delete Error:', err);
        res.status(500).json({ message: 'Failed to delete transaction', error: err.message });
    }
});

// GET SINGLE TRANSACTION
app.get('/transaction/:id', async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        if (isNaN(id)) {
            return res.status(400).json({ message: 'Invalid transaction ID' });
        }

        const transaction = await transactionService.findTransactionById(id);
        
        if (!transaction) {
            return res.status(404).json({ message: 'Transaction not found' });
        }

        res.status(200).json(transaction);
    } catch (err) {
        console.error('Get Transaction Error:', err);
        res.status(500).json({ message: 'Failed to get transaction', error: err.message });
    }
});

// Global error handler
app.use((err, req, res, next) => {
    console.error('Unhandled Error:', err);
    res.status(500).json({ message: 'Internal server error' });
});

app.listen(port, () => {
    const timestamp = moment().unix();
    console.log({ 
        timestamp,
        message: `Server started on port ${port}`
    });
});