import { render, screen, fireEvent } from "@testing-library/react";
import { DmsToDdForm } from "./index";

describe("DmsToDdForm", () => {
  const mockOnAddToMaps = jest.fn();

  beforeEach(() => {
    render(<DmsToDdForm onAddToMaps={mockOnAddToMaps} />);
  });

  test("renders correctly", () => {
    expect(screen.getByLabelText(/Latitude/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Longitude/i)).toBeInTheDocument();
    expect(screen.getByText(/Convert/i)).toBeInTheDocument();
    expect(screen.getByText(/Add to Maps/i)).toBeInTheDocument();
  });

  test("converts DMS to DD correctly", () => {
    const latDegreesInput = screen.getByLabelText("Latitude Degrees");
    const latMinutesInput = screen.getByLabelText("Latitude Minutes");
    const latSecondsInput = screen.getByLabelText("Latitude Seconds");
    const longDegreesInput = screen.getByLabelText("Longitude Degrees");
    const longMinutesInput = screen.getByLabelText("Longitude Minutes");
    const longSecondsInput = screen.getByLabelText("Longitude Seconds");
    const convertButton = screen.getByText(/Convert/i);

    fireEvent.change(latDegreesInput, { target: { value: "12" } });
    fireEvent.change(latMinutesInput, { target: { value: "34" } });
    fireEvent.change(latSecondsInput, { target: { value: "56" } });
    fireEvent.change(longDegreesInput, { target: { value: "78" } });
    fireEvent.change(longMinutesInput, { target: { value: "90" } });
    fireEvent.change(longSecondsInput, { target: { value: "12" } });
    fireEvent.click(convertButton);

    expect(
      screen.getByDisplayValue("12.582222222222223 deg"),
    ).toBeInTheDocument();
    expect(
      screen.getByDisplayValue("78.50333333333333 deg"),
    ).toBeInTheDocument();
  });

  test("calls onAddToMaps with correct values", () => {
    const latDegreesInput = screen.getByLabelText("Latitude Degrees");
    const latMinutesInput = screen.getByLabelText("Latitude Minutes");
    const latSecondsInput = screen.getByLabelText("Latitude Seconds");
    const longDegreesInput = screen.getByLabelText("Longitude Degrees");
    const longMinutesInput = screen.getByLabelText("Longitude Minutes");
    const longSecondsInput = screen.getByLabelText("Longitude Seconds");
    const addToMapsButton = screen.getByText(/Add to Maps/i);

    fireEvent.change(latDegreesInput, { target: { value: "12" } });
    fireEvent.change(latMinutesInput, { target: { value: "34" } });
    fireEvent.change(latSecondsInput, { target: { value: "56" } });
    fireEvent.change(longDegreesInput, { target: { value: "78" } });
    fireEvent.change(longMinutesInput, { target: { value: "90" } });
    fireEvent.change(longSecondsInput, { target: { value: "12" } });
    fireEvent.click(addToMapsButton);

    expect(mockOnAddToMaps).toHaveBeenCalledWith(
      12.582222222222223,
      78.50333333333333,
    );
  });
});
