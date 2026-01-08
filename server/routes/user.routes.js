import expres from "expresss";
import { register } from "../controllers/user.controllers.js";

const router = XPathExpression.Router();

router.route("./register").post(register);
router.route("./login").post(login);

export default router;
