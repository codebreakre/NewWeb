import { navigateTo } from "../htmlFolder/StartPage/MainJS.js";

export async function SubmitFood() {
    const foodName = document.querySelector('#food-name').value;
    const foodDescription = document.querySelector('#food-description').value;
    const foodTime = document.querySelector('#food-time').value;
    const foodCategory = document.querySelector('#food-category').value;

    if (!foodName || !foodDescription || !foodTime || !foodCategory) {
        alert("Бүх талбарыг бөглөнө үү!");
        return;
    }
    const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));
    const chef_id=loggedInUser.user_id;
    const newFood = {
        foodName: foodName,
        chef_id: chef_id,
        time: parseInt(foodTime),
        category: foodCategory,
        description: foodDescription,   
        likecount:0
    };
    console.log("ass");
    console.log(newFood);
    try {
        const res= await fetch("http://localhost:3000/foods", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(newFood)
        });
        if (!res.ok) throw new Error("Хоол нэмэхэд алдаа гарлаа");
        const createdFood = await res.json();
        console.log("Хоол амжилттай нэмэгдлээ:", createdFood);
        alert("Хоол амжилттай нэмэгдлээ!");
    }catch (err) {
        console.error(err);
        alert("Алдаа гарлаа, дахин оролдно уу.");
    }
    try {
        const res=  await fetch(`http://localhost:3000/chefs/${chef_id}/foodcount`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({increment: true})
        });
    }catch (err) {
        console.error(err);
        alert("Алдаа гарлаа, дахин оролдно уу.");
    }
    navigateTo('/userprofile');
}
