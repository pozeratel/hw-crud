export const updateStudApi = (id, students) => {
    const options = {
        method: "PUT",
        body: JSON.stringify(students),
        headers: {
            "Content-Type": "application/json; charset=UTF-8",

        }
    }

    return fetch(`http://localhost:3000/students/${id}`, options).then((res) => res.json())
}