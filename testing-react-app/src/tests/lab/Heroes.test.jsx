import { render, screen } from "@testing-library/react";
import axios from "axios";
import { beforeEach, expect, vi } from "vitest";
import HeroesFromAPI from "./Heroes";

vi.mock("axios");

describe("HeroesFromAPI component", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  test('should display "No heroes available" when API returns an empty list', async () => {
    axios.get.mockResolvedValue({ data: [] });

    render(<HeroesFromAPI />);

    let p = await screen.findByText(/no heroes available/i);
    expect(p).toBeInTheDocument();
    expect(axios.get).toHaveBeenCalledWith("http://localhost:3000/heroes");
  });

  test("should render a list of heroes after successful API fetch", async () => {
    let heroes = [
      { id: 10, name: "super man", strength: 20 },
      { id: 11, name: "bat man", strength: 12 },
    ];
    axios.get.mockResolvedValue({ data: heroes });

    render(<HeroesFromAPI />);

    let ul = await screen.findByRole("list");
    let liTags = screen.getAllByRole("listitem");
    expect(ul).toBeInTheDocument();
    expect(liTags).toHaveLength(heroes.length);
    expect(liTags[0]).toHaveTextContent("super man: power=20 (unbelievable)");
    expect(liTags[1]).toHaveTextContent("bat man: power=12 (strong)");
  });

  test("BONUS: should display an error message when API request fails with status 500", async () => {
    axios.get.mockRejectedValue({ response: { status: 500 } });

    render(<HeroesFromAPI />);

    let h1 = await screen.findByRole("heading");
    expect(h1).toHaveTextContent(/failed to fetch heroes/i);
  });
});
