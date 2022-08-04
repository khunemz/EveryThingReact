import {render, screen, waitForElementToBeRemoved} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from "./App";
import mockFetch from "./mocks/mockFetch";


beforeEach(() => {
  jest.spyOn(window, "fetch").mockImplementation(mockFetch);
})


afterEach(() => {
  jest.restoreAllMocks()
});

test("renders the landing page", () => {
  render(<App />);

  expect(screen.getByRole("heading")).toHaveTextContent(/Doggy Directory/);
  expect(screen.getByRole("combobox")).toHaveDisplayValue("Select a breed");
  expect(screen.getByRole("button", { name: "Search" })).toBeDisabled();
  expect(screen.getByRole("img")).toBeInTheDocument();
});


test("should be able to search and display dog image results", async () => {
  render(<App />);
   
  //...Simulate selecting an option and verifying its value

 //Simulate initiating the search request
  const searchBtn = screen.getByRole("button", { name: "Search" });
  expect(searchBtn).not.toBeDisabled();
  userEvent.click(searchBtn);

  //Loading state displays and gets removed once results are displayed
  await waitForElementToBeRemoved(() => screen.queryByText(/Loading/i));
})