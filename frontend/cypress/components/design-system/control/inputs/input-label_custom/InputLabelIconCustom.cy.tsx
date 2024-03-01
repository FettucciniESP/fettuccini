import React from "react";
import InputLabelIconCustom from "@/app/components/design-system/control/inputs/input-label-custom/InputLabelIconCustom";

describe("InputLabelIconCustom Component - Mounting", () => {
  it("should mount the component with required props", () => {
    const currentValue = "Test Value";
    const labelValue = "Label Value";
    const handleChangeCurrentValue = () => {};
    const handleChangeLabel = () => {};

    cy.mount(
      <InputLabelIconCustom
        currentValue={currentValue}
        labelValue={labelValue}
        handleChangeCurrentValue={handleChangeCurrentValue}
        handleChangeLabel={handleChangeLabel}
      />
    );

    cy.get('[id_cy="labelValue"]').should("exist");
    cy.get('[id_cy="inputValue"]').should("exist");
  });

  it("should mount the component with optional props", () => {
    const currentValue = "Test Value";
    const labelValue = "Label Value";
    const handleChangeCurrentValue = () => {};
    const handleChangeLabel = () => {};
    const type = "text";
    const iconValue = "PEN";
    const iconLabel = "PEN";
    const isUpperCase = true;
    const disabled = false;
    const customInputProps = {};
    const customAddToText = "Custom Additional Text";

    cy.mount(
      <InputLabelIconCustom
        currentValue={currentValue}
        labelValue={labelValue}
        handleChangeCurrentValue={handleChangeCurrentValue}
        handleChangeLabel={handleChangeLabel}
        type={type}
        iconValue={iconValue}
        iconLabel={iconLabel}
        isUpperCase={isUpperCase}
        disabled={disabled}
        customInputProps={customInputProps}
        customAddToText={customAddToText}
      />
    );

    cy.get('[id_cy="labelValue"]').should("have.value", labelValue);
    cy.get('[id_cy="inputValue"]').should("exist");
  });
});

describe("InputLabelIconCustom Component Tests", () => {
  beforeEach(() => {
    const currentValue = "Test Value";
    const labelValue = "Label Value";
    const handleChangeCurrentValue = () => {};
    const handleChangeLabel = () => {};

    cy.mount(
      <InputLabelIconCustom
        currentValue={currentValue}
        labelValue={labelValue}
        handleChangeCurrentValue={handleChangeCurrentValue}
        handleChangeLabel={handleChangeLabel}
      />
    );
  });

  it("should render label and input elements", () => {
    cy.get('[id_cy="labelValue"]').should("exist");
    cy.get('[id_cy="inputValue"]').should("exist");
  });

  it("should have default input type as text", () => {
    cy.get('[id_cy="inputValue"]').should("have.attr", "type", "text");
  });
});

describe("InputLabelIconCustom Component - Required Props", () => {
  it("should render with required props", () => {
    const currentValue = "Test Value";
    const labelValue = "Label Value";
    const handleChangeCurrentValue = () => {};
    const handleChangeLabel = () => {};

    cy.mount(
      <InputLabelIconCustom
        currentValue={currentValue}
        labelValue={labelValue}
        handleChangeCurrentValue={handleChangeCurrentValue}
        handleChangeLabel={handleChangeLabel}
      />
    );

    cy.get('[id_cy="labelValue"]').should("exist");
    cy.get('[id_cy="inputValue"]').should("exist");
  });
});

describe("InputLabelIconCustom Component - Optional Props", () => {
  it("should render with optional props", () => {
    const currentValue = "Test Value";
    const labelValue = "Label Value";
    const handleChangeCurrentValue = () => {};
    const handleChangeLabel = () => {};
    const type = "text";
    const iconValue = "PEN";
    const iconLabel = "PEN";
    const isUpperCase = true;
    const disabled = false;
    const customInputProps = {};
    const customAddToText = "Custom Additional Text";

    cy.mount(
      <InputLabelIconCustom
        currentValue={currentValue}
        labelValue={labelValue}
        handleChangeCurrentValue={handleChangeCurrentValue}
        handleChangeLabel={handleChangeLabel}
        type={type}
        iconValue={iconValue}
        iconLabel={iconLabel}
        isUpperCase={isUpperCase}
        disabled={disabled}
        customInputProps={customInputProps}
        customAddToText={customAddToText}
      />
    );

    cy.get('[id_cy="labelValue"]').should("have.value", labelValue);
    cy.get('[id_cy="inputValue"]').should("exist");
  });
});

describe("InputLabelIconCustom Component - Styling", () => {
  it("should apply uppercase style to label", () => {
    const currentValue = "Test Value";
    const labelValue = "Label Value";
    const handleChangeCurrentValue = () => {};
    const handleChangeLabel = () => {};
    const isUpperCase = true;

    cy.mount(
      <InputLabelIconCustom
        currentValue={currentValue}
        labelValue={labelValue}
        handleChangeCurrentValue={handleChangeCurrentValue}
        handleChangeLabel={handleChangeLabel}
        isUpperCase={isUpperCase}
      />
    );

    cy.get('[id_cy="labelValue"]').should(
      "have.css",
      "text-transform",
      "uppercase"
    );
  });
});
