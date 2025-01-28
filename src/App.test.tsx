import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import App from './App';
import { genericApi } from './service/generic';
import itemSelectionReducer from './store/itemSelectionSlice';
import { ITEMS_API_HOST } from './constants/endpoints'

// Mock the API hook
jest.mock('./service/generic', () => ({
  ...jest.requireActual('./service/generic'),
  useGetItemsQuery: () => ({
    data: [
      {
        guid: '123',
        path: ['1', '2'],
        name: 'Test Item',
        properties: {
            property1: 'property1',
            property2: 'property2',
        }
      },
      {
        guid: '456',
        path: ['3', '4'],
        name: 'Another Item',
        properties: {
            property2: 'property2',
            property3: 'property3',
        }
      }
    ],
    error: undefined,
    isLoading: false
  })
}));

// Create a test store
const createTestStore = () => 
  configureStore({
    reducer: {
      [genericApi.reducerPath]: genericApi.reducer,
      itemSelected: itemSelectionReducer
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(genericApi.middleware)
  });

describe('App Component', () => {
  let store: ReturnType<typeof createTestStore>;

  beforeEach(() => {
    store = createTestStore();
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('renders data table and tab component', () => {
    render(
      <Provider store={store}>
        <App />
      </Provider>
    );
    
    // Check if the table is rendered with data
    expect(screen.getByText('Test Item')).toBeInTheDocument();
    expect(screen.getByText('Another Item')).toBeInTheDocument();
    
    // Check if tabs are rendered
    expect(screen.getByText('Properties')).toBeInTheDocument();
    expect(screen.getByText('Image')).toBeInTheDocument();
  });

  it('shows loading state', () => {
    // Override the mock for this test
    jest.spyOn(require('./service/generic'), 'useGetItemsQuery').mockReturnValue({
      data: undefined,
      error: undefined,
      isLoading: true
    });

    render(
      <Provider store={store}>
        <App />
      </Provider>
    );

    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  it('shows error state', () => {
    // Override the mock for this test
    jest.spyOn(require('./service/generic'), 'useGetItemsQuery').mockReturnValue({
      data: undefined,
      error: { status: 500, data: 'Error' },
      isLoading: false
    });

    render(
      <Provider store={store}>
        <App />
      </Provider>
    );

    expect(screen.getByText('Sorry, we are unable to retrieve the items at this time.')).toBeInTheDocument();
  });

  it('selecting a row updates properties panel', async () => {
    render(
      <Provider store={store}>
        <App />
      </Provider>
    );

    // Find and click the first row (implementation depends on your DataTable component)
    const firstRow = screen.getByText('Test Item');
    fireEvent.click(firstRow);

    // Check if properties are displayed
    expect(screen.getByText('property1 : property1')).toBeInTheDocument();
    expect(screen.getByText('property2 : property2')).toBeInTheDocument();
  });

  it('shows image when Image tab is selected', () => {
    render(
      <Provider store={store}>
        <App />
      </Provider>
    );

    // Find and click the first row
    const firstRow = screen.getByText('Test Item');
    fireEvent.click(firstRow);

    // Click the Image tab
    const imageTab = screen.getByText('Image');
    fireEvent.click(imageTab);

    // Check if the image is rendered with correct attributes
    const image = screen.getByAltText('Item image');
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute('src', `${ITEMS_API_HOST}image/123`);
  });


  it('re-click of the data table does not reset the tab selection', () => {
    render(
      <Provider store={store}>
        <App />
      </Provider>
    );

    // Find and click the first row
    const firstRow = screen.getByText('Test Item');
    fireEvent.click(firstRow);

    // Click the Image tab
    const imageTab = screen.getByText('Image');
    fireEvent.click(imageTab);

    // Find and click the second row
    const secondRow = screen.getByText('Another Item');
    fireEvent.click(secondRow);

    // Check if the image is rendered with correct attributes
    const image = screen.getByAltText('Item image');
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute('src', `${ITEMS_API_HOST}image/456`);
  });
});
