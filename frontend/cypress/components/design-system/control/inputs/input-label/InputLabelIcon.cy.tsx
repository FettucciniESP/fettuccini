import React from "react";
import InputLabelIcon from "@/app/components/design-system/control/inputs/input-label/InputLabelIcon";

describe("InputLabelIcon Component - Mounting", () => {
  it("should mount the component with required props", () => {
    const currentValue = "Test Value";
    const handleChangeCurrentValue = () => {};

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
    const currentValue = "Test Value";
    const handleChangeCurrentValue = () => {};
    const type = "text";
    const label = "Custom Label";
    const isUpperCase = true;
    const disabled = false;
    const customInputProps = {};
    const customAddToText = "Custom Additional Text";

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
    const currentValue = "Test Value";
    const handleChangeCurrentValue = () => {};

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
    const currentValue = "Test Value";
    const handleChangeCurrentValue = () => {};

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

// describe("InputLabelIcon Component - Optional Props", () => {
//   it("should render with optional props", () => {
//     const currentValue = "Test Value";
//     const handleChangeCurrentValue = () => {};
//     const type = "text";
//     const label = "Custom Label";
//     const isUpperCase = true;
//     const disabled = false;
//     const customInputProps = {};
//     const customAddToText = "Custom Additional Text";

//     cy.mount(
//       <InputLabelIcon
//         currentValue={currentValue}
//         handleChangeCurrentValue={handleChangeCurrentValue}
//         type={type}
//         label={label}
//         isUpperCase={isUpperCase}
//         disabled={disabled}
//         customInputProps={customInputProps}
//         customAddToText={customAddToText}
//       />
//     );

//     cy.get('[id_cy="labelValue"]').should("have.value", label);
//     cy.get('[id_cy="inputValue"]').should("exist");
//   });
// });

// describe("InputLabelIcon Component - User Interaction", () => {
//   it("should update input value when handleChangeCurrentValue is called", () => {
//     const currentValue = "Test Value";
//     const handleChangeCurrentValue = cy.stub().as("handleChangeCurrentValue");

//     cy.mount(
//       <InputLabelIcon
//         currentValue={currentValue}
//         handleChangeCurrentValue={handleChangeCurrentValue}
//       />
//     );

//     const newValue = "New Test Value";
//     cy.get('[id_cy="inputValue"]').clear().type(newValue);

//     cy.wait(100).then(() => {
//       expect(handleChangeCurrentValue).to.be.calledWith(newValue);
//     });
//   });
// });
