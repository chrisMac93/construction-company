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
      cost = calculateWholeHomeCost(
        formData.wholeHomeTier,
        formData.wholeHomeSqFootage,
        formData.wholeHomeTierCosts
      );
      break;
    case "interior":
      cost = calculateInteriorCost(
        formData.interiorTier,
        formData.interiorSqFootage,
        formData.interiorTierCosts
      );
      break;
    case "exterior":
      cost = calculateExteriorCost(
        formData.exteriorTier,
        formData.exteriorSqFootage,
        formData.exteriorTierCosts
      );
      break;
    case "flooring":
      cost = calculateFlooringCost(
        formData.flooringMaterial,
        formData.flooringSqFootage,
        formData.flooringMaterialCosts
      );
      break;
    case "deck":
      cost = calculateDeckCost(
        formData.deckMaterial,
        formData.deckSqFootage,
        formData.deckLighting,
        formData.deckHandrails,
        formData.deckMaterialCosts,
        formData.handrailsCost,
        formData.lightingCost
      );
      break;
    case "patio":
      cost = calculatePatioCost(
        formData.patioMaterial,
        formData.patioSqFootage,
        formData.patioLighting,
        formData.patioHandrails,
        formData.patioMaterialCosts,
        formData.handrailsCost,
        formData.lightingCost
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
        formData.epoxySqFootage,
        formData.epoxyMaterialCosts
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
        formData.concreteSqFootage,
        formData.concreteMaterialCosts
      );
      break;
    case "roofing":
      cost = calculateRoofingCost(
        formData.roofingMaterial,
        formData.roofingSqFootage,
        formData.roofingMaterialCosts
      );
      break;
    default:
      break;
  }

  console.log("Calculated Cost:", cost); // Log calculated cost

  callback(cost);
}
