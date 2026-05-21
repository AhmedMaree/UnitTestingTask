
import { render, screen } from "@testing-library/react";
import Counter from "../components/Counter/Counter";
import { beforeEach, expect } from "vitest";
import userEvent from "@testing-library/user-event";

describe("Counter component", () => {

    beforeEach(()=>{
        render(<Counter />)

    })
  test("should be rendered", () => {


    let h1= screen.getByRole("heading")
    let btn2= screen.getAllByRole("button")
    expect(h1).toHaveTextContent(0)
    expect(btn2).toHaveLength(3)
  });

  test("should increase state when clicking increase btn",async()=>{
    let user= userEvent.setup()
    //access btn +
    let increaseBtn= screen.getByRole("button",{name:"Increment"})
    //fire click
    await user.click(increaseBtn)
    await user.click(increaseBtn)
    await user.click(increaseBtn)
    //assert state
    let h1= screen.getByRole("heading")
    expect(h1).toHaveTextContent(3)
  })
  test("should decrease state when clicking decrease btn",async()=>{
    let user= userEvent.setup()
    //access btn +
    let increaseBtn= screen.getByRole("button",{name:"Increment"})
    let decreaseBtn= screen.getByRole("button",{name:"Decrement"})
    //fire click
    await user.click(increaseBtn)
    await user.click(increaseBtn)
    await user.click(increaseBtn)
    await user.click(decreaseBtn)
    await user.click(decreaseBtn)
    await user.click(decreaseBtn)
    await user.click(decreaseBtn)
    //assert state
    let h1= screen.getByRole("heading")
    expect(h1).toHaveTextContent(-1)
  })
});
