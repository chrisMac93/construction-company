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
        formData.interiorTier,
        formData.interiorSqFootage,
        formData.interiorTierCosts,
        formData.includeDrywall,
        formData.drywallSqFootage,
        formData.drywallPricePerSqFoot
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
        formData.countertopMaterial,
        formData.countertopMaterialCosts,
        formData.kitchenCabinetMaterial,
        formData.kitchenCabinetMaterialCosts,
        formData.islandCost,
        formData.plumbingCost,
        formData.lightingCost
      );
      break;
    case "bath":
      cost = calculateBathroomCost(
        formData,
        formData.showerTubType,
        formData.showerTubCost,
        formData.sinkType,
        formData.sinkCost,
        formData.toiletType,
        formData.toiletCost,
        formData.plumbingCost,
        formData.lightingCost
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

  console.log("Total Cost: ", cost);
  callback(cost);
}
