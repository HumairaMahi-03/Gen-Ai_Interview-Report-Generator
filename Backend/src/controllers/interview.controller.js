const pdfParse = require('pdf-parse');
const generateInterviewReport = require("../services/ai.service")
const interviewReportModel = require("../models/interviewReport.model")


/**
 * @description Generate an interview report based on the candidate's resume, self-description, and job description. 
 */
async function generateInterViewReportController(req, res) {
    try {

        const resumeContent =
            await new pdfParse.PDFParse(
                Uint8Array.from(req.file.buffer)
            ).getText();

        const { selfDescription, jobDescription } = req.body;

        const interViewReportByAi =
            await generateInterviewReport({
                resume: resumeContent.text,
                selfDescription,
                jobDescription
            });

        console.log("REPORT FROM AI:");
        console.log(JSON.stringify(interViewReportByAi, null, 2));

        const interviewReport =
            await interviewReportModel.create({
                user: req.user.id,
                title: interViewReportByAi.title,

                resume: resumeContent.text,
                selfDescription,
                jobDescription,

                matchScore: interViewReportByAi.matchScore,

                technicalQuestions:
                    interViewReportByAi.technicalQuestions,

                behavioralQuestions:
                    interViewReportByAi.behavioralQuestions,

                skillGaps:
                    interViewReportByAi.skillGaps,

                preparationPlan:
                    interViewReportByAi.preparationPlan
            });

        res.status(201).json({
            message: "Interview report generated successfully.",
            interviewReport
        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            message: "Failed to generate interview report",
            error: error.message
        });
    }
}

/**
 * @description Get an interview report by its ID.
 */

async function getInterviewReportByIdController(req, res) {
    try {
        const { interviewId } = req.params;

        const interviewReport =
            await interviewReportModel.findOne({
                _id: interviewId,
                user: req.user.id
            });

        if (!interviewReport) {
            return res.status(404).json({
                message: "Interview report not found"
            });
        }

        res.status(200).json({
            message: "Interview report fetched successfully",
            interviewReport
        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            message: "Failed to fetch interview report",
            error: error.message
        });
    }
}

/**
 * @description Get all interview reports of the logged-in user.
 */

async function getAllInterviewReportsController(req, res) {
    try {
        const interviewReports =
            await interviewReportModel.find({
                user: req.user.id
            }).sort({ createdAt: -1 }).select("-resume -selfDescription -jobDescription -__v -technicalQuestions -behavioralQuestions -skillGaps -preparationPlan"); 

        res.status(200).json({
            message: "Interview reports fetched successfully",
            interviewReports
        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            message: "Failed to fetch interview reports",
            error: error.message
        });
    }
}

module.exports = {generateInterViewReportController,
    getInterviewReportByIdController,
    getAllInterviewReportsController
}