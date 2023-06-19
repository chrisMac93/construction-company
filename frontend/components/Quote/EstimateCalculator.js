import { calculateFlooringCost } from "../quoteComponents/FlooringForm";
import { calculateEpoxyCost } from "../quoteComponents/EpoxyForm";
import { calculateConcreteCost } from "../quoteComponents/ConcreteForm";
import { calculateDeckPatioCost } from "../quoteComponents/DeckPatioForm";
import { calculateKitchenCost } from "../quoteComponents/KitchenForm";
import { calculateBathroomCost } from "../quoteComponents/BathroomForm";
import { calculateInteriorCost } from "../quoteComponents/InteriorForm";
import { calculateExteriorCost } from "../quoteComponents/ExteriorForm";
import { calculateCoatingsCost } from "../quoteComponents/CoatingsForm";

export function calculateEstimate(formData, callback) {
  let cost = 0;

  switch (formData.projectType) {
    case "interior":
      cost = calculateInteriorCost(
        formData,
        formData.lightingCost,
        formData.plumbingCost
      );
      break;
    case "exterior":
      cost = calculateExteriorCost(formData, formData.landscapingCost);
      break;
    case "flooring":
      cost = calculateFlooringCost(
        formData.flooringMaterial,
        formData.flooringSqFootage,
        formData.flooringMaterialCosts
      );
      break;
    case "deckPatio":
      cost = calculateDeckPatioCost(
        formData.deckPatioMaterial,
        formData.deckPatioSqFootage,
        formData.deckPatioLighting,
        formData.deckPatioHandrails,
        formData.deckPatioMaterialCosts,
        formData.handrailsCost,
        formData.lightingCost
      );
      break;
    case "epoxy":
      cost = calculateEpoxyCost(
        formData.epoxyMaterial,
        formData.epoxySqFootage,
        formData.epoxyMaterialCosts
      );
      break;
    case "coatings":
      cost = calculateCoatingsCost(
        formData.coatingsMaterial,
        formData.coatingsSqFootage,
        formData.coatingsMaterialCosts
      );
      break;
    case "kitchen":
      cost = calculateKitchenCost(
        formData,
        formData.islandCost,
        formData.plumbingCost,
        formData.lightingCost
      );
      break;
    case "bath":
      cost = calculateBathroomCost(
        formData,
        formData.bathPlumbingCost,
        formData.bathLightingCost
      );
      break;
    case "concrete":
      cost = calculateConcreteCost(
        formData.concreteMaterial,
        formData.concreteSqFootage,
        formData.concreteMaterialCosts
      );
      break;
    default:
      break;
  }

  callback(cost);
}
