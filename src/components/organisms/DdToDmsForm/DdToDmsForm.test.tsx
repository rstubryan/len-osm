import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import { DdToDmsForm } from "@/components/organisms/DdToDmsForm";
import { ddToDms } from "@/utils/ddToDms";

jest.mock("@/utils/ddToDms");

describe("DdToDmsForm", () => {
  const mockOnAddToMaps = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("renders correctly", () => {
    render(<DdToDmsForm onAddToMaps={mockOnAddToMaps} />);
    expect(screen.getByLabelText(/Latitude/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Longitude/i)).toBeInTheDocument();
    expect(screen.getByText(/Convert/i)).toBeInTheDocument();
    expect(screen.getByText(/Add to Maps/i)).toBeInTheDocument();
  });

  test("updates state on input change", () => {
    render(<DdToDmsForm onAddToMaps={mockOnAddToMaps} />);
    const latInput = screen.getByLabelText(/Latitude/i);
    const longInput = screen.getByLabelText(/Longitude/i);

    fireEvent.change(latInput, { target: { value: "12.34" } });
    fireEvent.change(longInput, { target: { value: "56.78" } });

    expect(latInput).toHaveValue(12.34);
    expect(longInput).toHaveValue(56.78);
  });

  test("converts DD to DMS on convert button click", () => {
    const mockLatDMS = {
      degrees: 12,
      minutes: 20,
      seconds: 24,
      direction: "N",
    };
    const mockLongDMS = {
      degrees: 56,
      minutes: 46,
      seconds: 48,
      direction: "E",
    };
    (ddToDms as jest.Mock)
      .mockReturnValueOnce(mockLatDMS)
      .mockReturnValueOnce(mockLongDMS);

    render(<DdToDmsForm onAddToMaps={mockOnAddToMaps} />);
    const latInput = screen.getByLabelText(/Latitude/i);
    const longInput = screen.getByLabelText(/Longitude/i);
    const convertButton = screen.getByText(/Convert/i);

    fireEvent.change(latInput, { target: { value: "12.34" } });
    fireEvent.change(longInput, { target: { value: "56.78" } });
    fireEvent.click(convertButton);

    expect(screen.getByDisplayValue(/12° 20' 24" N/i)).toBeInTheDocument();
    expect(screen.getByDisplayValue(/56° 46' 48" E/i)).toBeInTheDocument();
  });

  test("calls onAddToMaps with correct arguments on add to maps button click", () => {
    render(<DdToDmsForm onAddToMaps={mockOnAddToMaps} />);
    const latInput = screen.getByLabelText(/Latitude/i);
    const longInput = screen.getByLabelText(/Longitude/i);
    const addToMapsButton = screen.getByText(/Add to Maps/i);

    fireEvent.change(latInput, { target: { value: "12.34" } });
    fireEvent.change(longInput, { target: { value: "56.78" } });
    fireEvent.click(addToMapsButton);

    expect(mockOnAddToMaps).toHaveBeenCalledWith(12.34, 56.78);
  });
});
