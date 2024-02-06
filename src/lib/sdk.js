const baseUrl = 'http://localhost:3000';

// GET ALL
export const getFavorites = async (baseUrl) => {
  const response = await fetch(`${baseUrl}/favorites`);
  const json = await response.json();

  return json.favorites;
};

// GET SINGLE
export const getFavorite = async (id) => {
  const response = await fetch(`${baseUrl}/favorites/${id}`);
  const json = await response.json();

  return json.favorite
};

//POST or ADD/CREATE
export const addFavorite = async (name, url) => {
  const response = await fetch(`${baseUrl}/favorites`, {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({name, url})
  })

  const json = await response.json();
  return json.id
}

//DELETE
export const deleteFavorite = async (id) => {
  const response = await fetch(`${baseUrl}/favorites/${id}`, {
    method: 'DELETE'
  });
  return response.status;
};

//PUT or UPDATE
export const replaceFavorite = async (id, newFav) => {
  const response = await fetch(`${baseUrl}/favorites/${id}`, {
    method: 'PUT',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(newFav)
  })
  return response.status
}


