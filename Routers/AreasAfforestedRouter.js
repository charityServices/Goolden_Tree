// Routers/AreasAfforestedRouter.js
const { Router } = require("express");
const areasAfforestedController = require("../Controllers/AreasAfforestedController");
const router = Router();
const athentication = require("../Middleware/athentication");

router.get("/Get_All_Areas_Afforested", areasAfforestedController.getAllAreasAfforested);
router.get("/Get_Afforested_Activity_By_Id/:id", areasAfforestedController.getAfforestedActivityById);
router.post("/Add_New_Afforested_Activity", areasAfforestedController.imageAfforested, areasAfforestedController.addNewAfforestedActivity);
// router.get("/Get_Afforested_Activities_By_Donor_Id", athentication.verifyJWT, areasAfforestedController.getAfforestedActivitiesByDonorId);
// router.get("/Get_Afforested_Activities_By_Organization_Id", athentication.verifyJWT, areasAfforestedController.getAfforestedByOrganizationId);
router.put("/Update_Afforested_Activity_By_Id/:id", areasAfforestedController.imageAfforested, areasAfforestedController.updateAfforestedActivityById);
router.delete("/Delete_Afforested_Activity_By_Id/:id", areasAfforestedController.deleteAfforestedActivityById);


module.exports = router;