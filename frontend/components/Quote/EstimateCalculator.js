import { calculateFlooringCost } from "../quoteComponents/FlooringForm";
import { calculateEpoxyCost } from "../quoteComponents/EpoxyForm";
import { calculateConcreteCost } from "../quoteComponents/ConcreteForm";
import { calculateRoofingCost } from "../quoteComponents/RoofingForm";
import { calculateDeckingCost } from "../quoteComponents/DeckForm";
import { calculatePatioCost } from "../quoteComponents/PatioForm";
import { calculateDrywallCost } from "../quoteComponents/DrywallForm";
import { calculateKitchenCost } from "../quoteComponents/KitchenForm";
import { calculateBathroomCost } from "../quoteComponents/BathroomForm";
import { calculateWholeHomeCost } from "../quoteComponents/WholeHomeForm";
import { calculateInteriorCost } from "../quoteComponents/InteriorForm";
import { calculateExteriorCost } from "../quoteComponents/ExteriorForm";

export function calculateEstimate(formData, callback) {
  let cost = 0;

  console.log("Form Data:", formData); // Log form data

    console.log("Project Type:", formData.projectType); // Log project type

    switch (formData.projectType) {
      case "wholeHome":
        cost = calculateWholeHomeCost(tier, wholeHomeSqFootage);
        break;
      case "interior":
        cost = calculateInteriorCost(tier, interiorSqFootage);
        break;
      case "exterior":
        cost = calculateExteriorCost(tier, exteriorSqFootage);
        break;
      case "flooring":
        cost = calculateFlooringCost(
          formData.flooringMaterial,
          formData.flooringSqFootage
        );
        break;
      case "deck":
        cost = calculateDeckingCost(
          formData.deckMaterial,
          formData.sqFootage,
          formData.lighting,
          formData.handrails
        );
        break;
      case "patio":
        cost = calculatePatioCost(
          formData.patioMaterial,
          formData.sqFootage,
          formData.lighting,
          formData.handrails
        );
        break;
      case "drywall":
        cost = calculateDrywallCost(
          formData.material,
          formData.size,
          formData.thickness,
          formData.sqFootage
        );
        break;
      case "epoxy":
        cost = calculateEpoxyCost(formData.material, formData.sqFootage);
        break;
      case "kitchen":
        cost = calculateKitchenCost(formData);
        break;
      case "bath":
        cost = calculateBathroomCost(formData);
        break;
      case "concrete":
        cost = calculateConcreteCost(formData.concreteType, formData.sqFootage);
        break;
      case "roofing":
        cost = calculateRoofingCost(
          formData.roofingMaterial,
          formData.sqFootage
        );
        break;
      default:
        break;
    }

    console.log("Calculated Cost:", cost); // Log calculated cost

    callback(cost);
};
