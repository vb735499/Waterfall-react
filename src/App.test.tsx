import {act} from 'react';
import {render, screen} from '@testing-library/react';
import Blog from './pages/Blog';

test('renders Blog', () => {
  render(<Blog />);
  const linkElement = screen.getByText("UploadFile");
  expect(linkElement).toBeInTheDocument();
});
