import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { expect } from "vitest";
import Status from "./Status";

describe("Status component", () => {
  test('should render "Offline" and the toggle button on initial render', () => {
    render(<Status />);
    
    let status = screen.getByText(/offline/i);
    let btn = screen.getByRole("button", { name: /toggle status/i });

    expect(status).toBeInTheDocument();
    expect(btn).toBeInTheDocument();
  });

  test('should switch to "Online" when button is clicked once', async () => {
    let user = userEvent.setup();
    render(<Status />);

    let btn = screen.getByRole("button", { name: /toggle status/i });
    await user.click(btn);

    let status = screen.getByText(/online/i);
    expect(status).toBeInTheDocument();
  });

  test('should switch back to "Offline" when button is clicked twice', async () => {
    let user = userEvent.setup();
    render(<Status />);

    let btn = screen.getByRole("button", { name: /toggle status/i });
    await user.click(btn);
    await user.click(btn);

    let status = screen.getByText(/offline/i);
    expect(status).toBeInTheDocument();
  });
});
