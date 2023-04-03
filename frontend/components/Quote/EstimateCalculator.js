import { calculateFlooringCost } from "../quoteComponents/FlooringForm";
import { calculateEpoxyCost } from "../quoteComponents/EpoxyForm";
import { calculateConcreteCost } from "../quoteComponents/ConcreteForm";
import { calculateRoofingCost } from "../quoteComponents/RoofingForm";
import { calculateDeckCost } from "../quoteComponents/DeckForm";
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
      cost = calculateDeckCost(
        formData.deckMaterial,
        formData.deckSqFootage,
        formData.deckLighting,
        formData.deckHandrails
      );
      break;
    case "patio":
      cost = calculatePatioCost(
        formData.patioMaterial,
        formData.patioSqFootage,
        formData.patioLighting,
        formData.patioHandrails
      );
      break;
    case "drywall":
      cost = calculateDrywallCost(
        formData.drywallMaterial,
        formData.size,
        formData.thickness,
        formData.drywallSqFootage
      );
      break;
    case "epoxy":
      cost = calculateEpoxyCost(
        formData.epoxyMaterial,
        formData.epoxySqFootage
      );
      break;
    case "kitchen":
      cost = calculateKitchenCost(formData);
      break;
    case "bath":
      cost = calculateBathroomCost(formData);
      break;
    case "concrete":
      cost = calculateConcreteCost(
        formData.concreteMaterial,
        formData.concreteSqFootage
      );
      break;
    case "roofing":
      cost = calculateRoofingCost(
        formData.roofingMaterial,
        formData.roofingSqFootage
      );
      break;
    default:
      break;
  }

  console.log("Calculated Cost:", cost); // Log calculated cost

  callback(cost);
}
