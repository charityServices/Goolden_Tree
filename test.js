// //! Get All Activities 
// const getAllActivities = async (req, res) => {
//   try {
//     const activities = await Activities.find({ isDeleted: false });
    
//     const activitiesWithImages = activities.map((activity) => ({
//       ...activity.toJSON(),
//       image_url: `http://localhost:5000/ActivitiesImages/${activity.activitiesImageName}`,
//     }));

//     res.status(200).json({
//       success: true,
//       message: "Activities returned Successfully",
//       Activities: activitiesWithImages,
//     });
//   } catch (error) {
//     console.error("Error Occurred While Get Activities", error);
//     res.status(500).json({
//       success: false,
//       message: "Error Occurred While Get Activities",
//       error: error.message,
//     });
//   }
// }

// const Activities = require("./Models/Activities");

// describe("getAllActivities", () => {
//   it("should return all activities", async () => {
//     // Mocking the return value of the Activities.find method
//     jest.spyOn(Activities, 'find').mockResolvedValue([
//       {
//         "_id": "655941e8e75b30bd4dd7483a",
//         "activityName": "ورشة العمل حول زراعة الأشجار",
//         "activityDescription": "ورشة توعية حول أهمية زراعة الأشجار وكيفية القيام بها بشكل صحيح",
//         "activityDate": "2023-12-15",
//         "activitiesImageName": "1700348392092_4.jpg",
//         "isDeleted": false,
//         "__v": 0,
//         "image_url": "http://localhost:5000/ActivitiesImages/1700348392092_4.jpg"
//       },
//       // ... إضافة أنشطة إضافية هنا ...
//     ]);

//     const req = {}; // يمكنك إضافة الخصائص ذات الصلة إذا لزم الأمر
//     const res = {
//       status: jest.fn().mockReturnThis(),
//       json: jest.fn(),
//     };

//     await getAllActivities(req, res);

//     // Check if Activities.find was called with the correct parameters
//     expect(Activities.find).toHaveBeenCalledWith({ isDeleted: false });

//     // Check if res.status and res.json were called with the correct parameters
//     expect(res.status).toHaveBeenCalledWith(200);
//     expect(res.json).toHaveBeenCalledWith({
//       success: true,
//       message: 'Activities returned Successfully',
//       Activities: expect.arrayContaining([
//         expect.objectContaining({
//           activityName: "ورشة العمل حول زراعة الأشجار",
//           activityDescription: "ورشة توعية حول أهمية زراعة الأشجار وكيفية القيام بها بشكل صحيح",
//           activityDate: "2023-12-15",
//           activitiesImageName: "1700348392092_4.jpg",
//           isDeleted: false,
//           image_url: "http://localhost:5000/ActivitiesImages/1700348392092_4.jpg",
//         }),
//         // ... إضافة تأكيد للأنشطة الأخرى هنا ...
//       ]),
//     });
//   });

//   it("should handle errors and return a 500 status code", async () => {
//     // Mocking an error in the Activities.find method
//     jest.spyOn(Activities, 'find').mockRejectedValue(new Error('Some error'));

//     const req = {}; // يمكنك إضافة الخصائص ذات الصلة إذا لزم الأمر
//     const res = {
//       status: jest.fn().mockReturnThis(),
//       json: jest.fn(),
//     };

//     await getAllActivities(req, res);

//     // Check if Activities.find was called with the correct parameters
//     expect(Activities.find).toHaveBeenCalledWith({ isDeleted: false });

//     // Check if res.status and res.json were called with the correct parameters
//     expect(res.status).toHaveBeenCalledWith(500);
//     expect(res.json).toHaveBeenCalledWith({
//       success: false,
//       message: 'Error Occurred While Get Activities',
//       error: 'Some error',
//     });
//   });
// });
