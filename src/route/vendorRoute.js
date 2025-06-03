import express from "express"

const router = express.Router();

router.post("/send", (req, res) => {
    const {to, message} = req.body;
    const status = Math.random() < 0.9 ? 'SENT' : 'FAILED';
    setTimeout(() => {
        res.json({to, status});
    }, 200)
})

export default router;