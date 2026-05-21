import { render, screen } from "@testing-library/react";
import Button from "../components/Button/Button";
import { expect, vi } from "vitest";
import userEvent from "@testing-library/user-event";

describe("Button component", () => {
  test("should be rendered", () => {
    //render
    render(<Button>click me</Button>);
    //access DOM
    let btn = screen.getByRole("button");
    //assert
    expect(btn).toBeInTheDocument();
    expect(btn).toHaveTextContent("click me");
  });
  test("click handler should be called when click the btn",async () => {
    let user = userEvent.setup();
    let clickHandler = vi.fn();
    render(<Button onClick={clickHandler}>click me</Button>);

    expect(clickHandler).not.toHaveBeenCalled();
    //access btn
    let btn = screen.getByRole("button");
    //fire event click
   await user.click(btn);
    //assert
    expect(clickHandler).toHaveBeenCalled();
  });
});
