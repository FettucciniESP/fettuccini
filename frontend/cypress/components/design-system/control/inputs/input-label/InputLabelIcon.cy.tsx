import React from "react";
import InputLabelIcon from "@/app/components/design-system/control/inputs/input-label/InputLabelIcon";

describe("InputLabelIcon Component - Mounting", () => {
  it("should mount the component with required props", () => {
    const currentValue: string = "Test Value";
    const handleChangeCurrentValue: () => void = () => {};

    cy.mount(
      <InputLabelIcon
        currentValue={currentValue}
        handleChangeCurrentValue={handleChangeCurrentValue}
      />
    );

    cy.get('[id_cy="labelValue"]').should("exist");
    cy.get('[id_cy="inputValue"]').should("exist");
  });

  it("should mount the component with optional props", () => {
    const currentValue: string = "Test Value";
    const handleChangeCurrentValue: () => void = () => {};
    const type: string = "text";
    const label: string = "Custom Label";
    const isUpperCase: boolean = true;
    const disabled: boolean = false;
    const customInputProps: object = {};
    const customAddToText: string = "Custom Additional Text";

    cy.mount(
      <InputLabelIcon
        currentValue={currentValue}
        handleChangeCurrentValue={handleChangeCurrentValue}
        type={type}
        label={label}
        isUpperCase={isUpperCase}
        disabled={disabled}
        customInputProps={customInputProps}
        customAddToText={customAddToText}
      />
    );

    cy.get('[id_cy="labelValue"]').should("exist").contains(label);
    cy.get('[id_cy="inputValue"]').should("exist");
  });
});

describe("InputLabelIcon Component Tests", () => {
  // Montez le composant avant chaque test
  beforeEach(() => {
    const currentValue: string = "Test Value";
    const handleChangeCurrentValue: () => void = () => {};

    cy.mount(
      <InputLabelIcon
        currentValue={currentValue}
        handleChangeCurrentValue={handleChangeCurrentValue}
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

describe("InputLabelIcon Component - Required Props", () => {
  it("should render with required props", () => {
    const currentValue: string = "Test Value";
    const handleChangeCurrentValue: () => void = () => {};

    cy.mount(
      <InputLabelIcon
        currentValue={currentValue}
        handleChangeCurrentValue={handleChangeCurrentValue}
      />
    );

    // Vérifie que le composant est rendu sans erreur
    cy.get('[id_cy="labelValue"]').should("exist");
    cy.get('[id_cy="inputValue"]').should("exist");
  });
});

 describe("InputLabelIcon Component - Optional Props", () => {
   it("should render with optional props", () => {
     const currentValue: string = "Test Value";
     const handleChangeCurrentValue: () => void = () => {};
     const type: string = "text";
     const label: string = "Custom Label";
     const isUpperCase: boolean = true;
     const disabled: boolean = false;
     const customInputProps: object = {};
     const customAddToText: string = "Custom Additional Text";

     cy.mount(
       <InputLabelIcon
         currentValue={currentValue}
         handleChangeCurrentValue={handleChangeCurrentValue}
         type={type}
         label={label}
         isUpperCase={isUpperCase}
         disabled={disabled}
         customInputProps={customInputProps}
         customAddToText={customAddToText}
       />
     );

     cy.get('[id_cy="labelValue"]').should("contain", label);
     cy.get('[id_cy="inputValue"]').should("exist");
   });
 });

