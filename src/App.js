import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { ChakraProvider, Box, VStack, HStack, Heading, Input, Button, Select, Text, List, ListItem } from '@chakra-ui/react';
import { ChevronDownIcon } from '@chakra-ui/icons';
import CategoryModal from './CategoryModal';
import Report from './Report';

function App() {
  const [expenses, setExpenses] = useState([]);
  const [categories, setCategories] = useState([]);
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');
  const [budget, setBudget] = useState('');
  const [showBudgetForm, setShowBudgetForm] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [showCategoryModal, setShowCategoryModal] = useState(false);
  const [showReport, setShowReport] = useState(false);

  const fetchBudget = useCallback(async () => {
    try {
      const response = await axios.get('http://localhost:8000/api/budgets/');
      if (response.data.length > 0) {
        setBudget(response.data[0].amount);
        setShowBudgetForm(false);
      }
    } catch (error) {
      console.error('Error fetching budget:', error);
    }
  }, []);

  useEffect(() => {
    fetchExpenses();
    fetchBudget();
    fetchCategories();
  }, [fetchBudget]);

  const fetchExpenses = async () => {
    try {
      const response = await axios.get('http://localhost:8000/api/expenses/');
      setExpenses(response.data);
    } catch (error) {
      console.error('Error fetching expenses:', error);
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await axios.get('http://localhost:8000/api/categories/');
      setCategories(response.data);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  const addExpense = async (e) => {
    e.preventDefault();
    if (description && amount && selectedCategory) {
      try {
        const response = await axios.post('http://localhost:8000/api/expenses/', {
          description,
          amount: parseFloat(amount),
          category_id: selectedCategory
        });
        setExpenses([...expenses, response.data]);
        setDescription('');
        setAmount('');
        setSelectedCategory('');
      } catch (error) {
        console.error('Error adding expense:', error);
      }
    }
  };

  const deleteExpense = async (id) => {
    try {
      await axios.delete(`http://localhost:8000/api/expenses/${id}/`);
      setExpenses(expenses.filter(expense => expense.id !== id));
    } catch (error) {
      console.error('Error deleting expense:', error);
    }
  };

  const formatAmount = (amount) => {
    const parsedAmount = parseFloat(amount);
    return isNaN(parsedAmount) ? '0.00' : parsedAmount.toFixed(2);
  };

  const totalExpenses = expenses.reduce((total, expense) => total + parseFloat(expense.amount || 0), 0);

  const remainingBudget = budget ? parseFloat(budget) - totalExpenses : 0;

  const handleSetBudget = async (e) => {
    e.preventDefault();
    if (budget) {
      try {
        const response = await axios.post('http://localhost:8000/api/budgets/', {
          amount: parseFloat(budget)
        });
        setBudget(response.data.amount);
        setShowBudgetForm(false);
      } catch (error) {
        console.error('Error setting budget:', error);
      }
    }
  };

  const addCategory = async (name, description) => {
    try {
      const response = await axios.post('http://localhost:8000/api/categories/', { name, description });
      setCategories([...categories, response.data]);
    } catch (error) {
      console.error('Error adding category:', error);
    }
  };

  const editCategory = async (id, name, description) => {
    try {
      const response = await axios.put(`http://localhost:8000/api/categories/${id}/`, { name, description });
      setCategories(categories.map(category => category.id === id ? response.data : category));
    } catch (error) {
      console.error('Error editing category:', error);
    }
  };

  const deleteCategory = async (id) => {
    try {
      await axios.delete(`http://localhost:8000/api/categories/${id}/`);
      setCategories(categories.filter(category => category.id !== id));
    } catch (error) {
      console.error('Error deleting category:', error);
    }
  };

  return (
    <ChakraProvider>
      <Box
        backgroundImage="url('/background.png')"
        backgroundSize="cover"
        backgroundPosition="center"
        backgroundRepeat="no-repeat"
        backgroundAttachment="fixed"
        minHeight="100vh"
        width="100%"
        display="flex"
        justifyContent="center"
        alignItems="center"
        position="relative"
      >
        <Box
          position="absolute"
          top={0}
          left={0}
          right={0}
          bottom={0}
          bg="rgba(0, 0, 0, 0.7)"
          zIndex={0}
        />
        <Box
          maxWidth="800px"
          width="100%"
          p={6}
          position="relative"
          zIndex={1}
          bg="rgba(255, 255, 255, 0.1)"
          borderRadius="lg"
          backdropFilter="blur(10px)"
        >
          <VStack spacing={8} align="stretch">
            <Heading
              as="h1"
              size="2xl"
              textAlign="center"
              color="white"
              textShadow="2px 2px 4px rgba(0,0,0,0.5)"
              fontFamily="'Parisienne', cursive"
            >
              Student Expense Tracker
            </Heading>
            {showBudgetForm ? (
              <form onSubmit={handleSetBudget}>
                <HStack>
                  <Input
                    type="number"
                    value={budget}
                    onChange={(e) => setBudget(e.target.value)}
                    placeholder="Set your budget"
                    step="0.01"
                    bg="white"
                    maxWidth="70%"
                  />
                  <Button type="submit" colorScheme="blue" flexGrow={1}>Set Budget</Button>
                </HStack>
              </form>
            ) : (
              <VStack spacing={3}>
                <Text fontSize="xl" color="white">Budget: ${formatAmount(budget)}</Text>
                <Text fontSize="xl" color="white">Remaining Budget: ${formatAmount(remainingBudget)}</Text>
                <Button onClick={() => setShowBudgetForm(true)} colorScheme="blue" size="sm">Update Budget</Button>
              </VStack>
            )}
            <form onSubmit={addExpense} mb={4}>
              <VStack spacing={4}>
                <Input
                  type="text"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Expense description"
                  bg="white"
                />
                <Input
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  placeholder="Amount"
                  step="0.01"
                  bg="white"
                />
                <Select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  bg="white"
                  icon={<ChevronDownIcon color="gray.500" />}
                >
                  <option value="">Select a category</option>
                  {categories.map((category) => (
                    <option key={category.id} value={category.id}>
                      {category.name}
                    </option>
                  ))}
                </Select>
                <Button type="submit" colorScheme="green" width="100%">Add Expense</Button>
              </VStack>
            </form>
            <HStack justifyContent="center" spacing={4}>
              <Button onClick={() => setShowCategoryModal(true)} colorScheme="purple" size="sm">Manage Categories</Button>
              <Button onClick={() => setShowReport(!showReport)} colorScheme="teal" size="sm">
                {showReport ? 'Hide Report' : 'Show Report'}
              </Button>
            </HStack>
            <Box
              bg="rgba(255, 255, 255, 0.1)"
              p={4}
              borderRadius="md"
              boxShadow="md"
            >
              <Heading as="h2" size="xl" color="white" textShadow="1px 1px 2px rgba(0,0,0,0.5)" mb={4} fontFamily="'Parisienne', cursive">
                Expense List
              </Heading>
              <Box bg="white" p={4} borderRadius="md" boxShadow="inner">
                {expenses.length > 0 ? (
                  <List spacing={3}>
                    {expenses.map((expense) => (
                      <ListItem key={expense.id} p={3} borderRadius="md" borderWidth={1} borderColor="gray.200">
                        <HStack justifyContent="space-between">
                          <VStack align="start" spacing={0}>
                            <Text fontWeight="bold">{expense.description}</Text>
                            <Text fontSize="sm" color="gray.600">
                              ${formatAmount(expense.amount)}
                              {expense.category && ` - ${expense.category.name}`}
                            </Text>
                          </VStack>
                          <Button onClick={() => deleteExpense(expense.id)} colorScheme="red" size="sm">Delete</Button>
                        </HStack>
                      </ListItem>
                    ))}
                  </List>
                ) : (
                  <Text color="gray.500" textAlign="center">No expenses added yet.</Text>
                )}
              </Box>
            </Box>
            <Box
              bg="rgba(255, 255, 255, 0.2)"
              p={4}
              borderRadius="md"
              boxShadow="md"
            >
              <Text fontSize="2xl" fontWeight="bold" color="white" textShadow="1px 1px 2px rgba(0,0,0,0.5)" textAlign="center">
                Total Expenses: ${formatAmount(totalExpenses)}
              </Text>
            </Box>
            {showCategoryModal && (
              <CategoryModal
                categories={categories}
                onClose={() => setShowCategoryModal(false)}
                onAddCategory={addCategory}
                onEditCategory={editCategory}
                onDeleteCategory={deleteCategory}
              />
            )}
            {showReport && <Report />}
          </VStack>
        </Box>
      </Box>
    </ChakraProvider>
  );
}

export default App;
