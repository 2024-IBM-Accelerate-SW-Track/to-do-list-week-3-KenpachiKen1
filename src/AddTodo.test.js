import { render, screen, fireEvent} from '@testing-library/react';
import { unmountComponentAtNode } from 'react-dom';
import App from './App';
import '@testing-library/jest-dom/extend-expect';

let container = null;
beforeEach(() => {
  // setup a DOM element as a render target
  container = document.createElement("div");
  document.body.appendChild(container);
});

afterEach(() => {
  // cleanup on exiting
  unmountComponentAtNode(container);
  container.remove();
  container = null;
});




 test('test that App component doesn\'t render dupicate Task', () => {
  render(<App />);

  const inputTask = screen.getByRole('textbox', {name: /Add New Item/i});
  const inputDate = screen.getByPlaceholderText("mm/dd/yyyy");
  const element = screen.getByRole('button', {name: /Add/i});
  const taskName = "Math Test";
  const dueDate = "06/15/2023";

  fireEvent.change(inputTask, {target: {value: taskName}});
  fireEvent.change(inputDate, {target: {value: dueDate}});
  fireEvent.click(element);

  fireEvent.change(inputTask, {target: {value: taskName}});
  fireEvent.change(inputDate, {target: {value: dueDate}});
  fireEvent.click(element);


  const tasks = screen.getAllByText(new RegExp(taskName, "i"));
  expect(tasks.length).toBe(1);


 });

 test('test that App component doesn\'t add a task without task name', () => {
  render(<App />);
  const inputDate = screen.getByPlaceholderText("mm/dd/yyyy");
  const element = screen.getByRole('button', {name: /Add/i});
  const dueDate = "06/15/2023";

  fireEvent.change(inputDate, {target: {value: dueDate}});
  fireEvent.click(element);
  const tasks = screen.queryByText(/06\/15\/2023/i);
  expect(tasks).not.toBeInTheDocument();

 });

 test('test that App component doesn\'t add a task without due date', () => {
  render(<App />);

  const inputTask = screen.getByRole('textbox', {name: /Add New Item/i});
  const element = screen.getByRole('button', {name: /Add/i});

  const taskName = "Science Test";

  
  fireEvent.change(inputTask, {target: {value: taskName}});
  fireEvent.click(element);
  const tasks = screen.queryByText(new RegExp(taskName, "i"));
  expect(tasks).not.toBeInTheDocument();

 });



 test('test that App component can be deleted thru checkbox', () => {
  render(<App />);

  
  const inputTask = screen.getByRole('textbox', {name: /Add New Item/i});
  const inputDate = screen.getByPlaceholderText("mm/dd/yyyy");
  const element = screen.getByRole('button', {name: /Add/i});
  const taskName = "Math Test";
  const dueDate = "05/15/2023";

  fireEvent.change(inputTask, {target: {value: taskName}});
  fireEvent.change(inputDate, {target: {value: dueDate}});
  fireEvent.click(element);


  const card = screen.getByText(taskName).closest('.MuiCard-root');
  expect(card).toHaveStyle('background-color: red');

  

 });


 test('test that App component renders different colors for past due events', () => {
  render(<App />);

  const inputTask = screen.getByRole('textbox', {name: /Add New Item/i});
  const inputDate = screen.getByPlaceholderText("mm/dd/yyyy");
  const element = screen.getByRole('button', {name: /Add/i});
  const taskName = "Math Test";
  const dueDate = "06/15/2023";

  fireEvent.change(inputTask, {target: {value: taskName}});
  fireEvent.change(inputDate, {target: {value: dueDate}});
  fireEvent.click(element);

  const checkbox = screen.getByRole('checkbox');
  fireEvent.click(checkbox);

  const tasks= screen.queryByText(new RegExp(taskName, "i"));
  expect(tasks).not.toBeInTheDocument();
 });
