import React from "react";
import SwitchLabel from "@/app/components/design-system/control/checkbox/single/switch-label/SwitchLabel";

describe("SwitchLabel Component - Mounting", () => {
  it("should mount the component with required props", () => {
    const currentValue: boolean = true;
    const handleChangeCurrentValue: () => void = () => {};

    cy.mount(
      <SwitchLabel
        currentValue={currentValue}
        handleChangeCurrentValue={handleChangeCurrentValue}
      />
    );

    cy.get('[id_cy="labelValue"]').should("exist");
    cy.get('[id_cy="switchValue"]').should("exist");
  });

  it("should mount the component with optional props", () => {
    const currentValue: boolean = true;
    const handleChangeCurrentValue: () => void = () => {};
    const label: string = "Switch Label";
    const isUpperCase: boolean = true;
    const disabled: boolean = false;

    cy.mount(
      <SwitchLabel
        currentValue={currentValue}
        handleChangeCurrentValue={handleChangeCurrentValue}
        label={label}
        isUpperCase={isUpperCase}
        disabled={disabled}
      />
    );

    cy.get('[id_cy="labelValue"]').should("contain", label);
    cy.get('[id_cy="switchValue"]').should("exist");
  });
});

describe("SwitchLabel Component Tests", () => {
  beforeEach(() => {
    const currentValue: boolean = true;
    const handleChangeCurrentValue: () => void = () => {};

    cy.mount(
      <SwitchLabel
        currentValue={currentValue}
        handleChangeCurrentValue={handleChangeCurrentValue}
      />
    );
  });

  it("should render label and switch elements", () => {
    cy.get('[id_cy="labelValue"]').should("exist");
    cy.get('[id_cy="switchValue"]').should("exist");
  });
});

describe("SwitchLabel Component - Required Props", () => {
  it("should render with required props", () => {
    const currentValue: boolean = true;
    const handleChangeCurrentValue: () => void = () => {};

    cy.mount(
      <SwitchLabel
        currentValue={currentValue}
        handleChangeCurrentValue={handleChangeCurrentValue}
      />
    );

    cy.get('[id_cy="labelValue"]').should("exist");
    cy.get('[id_cy="switchValue"]').should("exist");
  });
});

describe("SwitchLabel Component - Optional Props", () => {
  it("should render with optional props", () => {
    const currentValue: boolean = true;
    const handleChangeCurrentValue: () => void = () => {};
    const label: string = "Switch Label";
    const isUpperCase: boolean = true;
    const disabled: boolean = false;

    cy.mount(
      <SwitchLabel
        currentValue={currentValue}
        handleChangeCurrentValue={handleChangeCurrentValue}
        label={label}
        isUpperCase={isUpperCase}
        disabled={disabled}
      />
    );

    cy.get('[id_cy="labelValue"]').should("contain", label);
    cy.get('[id_cy="switchValue"]').should("exist");
  });
});

describe("SwitchLabel Component - Styling", () => {
  it("should apply uppercase style to label", () => {
    const currentValue: boolean = true;
    const handleChangeCurrentValue: () => void = () => {};
    const label: string = "Switch Label";
    const isUpperCase: boolean = true;

    cy.mount(
      <SwitchLabel
        currentValue={currentValue}
        handleChangeCurrentValue={handleChangeCurrentValue}
        label={label}
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
