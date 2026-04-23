import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";

async function createGame(newGame) {
  const response = await fetch("http://localhost:3000/api/games", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newGame),
  });

  if (!response.ok) {
    throw new Error("Failed to create game");
  }

  return response.json();
}

function CreateGame() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { mutate, isPending, error } = useMutation({
    mutationFn: createGame,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["games"] });
      reset();
      navigate("/");
    },
  });

  const onSubmit = (formData) => {
    mutate({
      name: formData.name,
      platform: formData.platform,
      genre: formData.genre,
    });
  };

  return (
    <div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="form-container bg-card"
        style={{ padding: "1rem" }}
      >
        <h2>Add a New Game</h2>

        <label>Game Name</label>
        <input
          type="text"
          placeholder="E.g Super Mario"
          {...register("name", { required: "Name is required." })}
        />
        {errors.name && <p style={{ color: "red" }}>{errors.name.message}</p>}

        <label>Platform</label>
        <input
          type="text"
          placeholder="E.g Switch, PC"
          {...register("platform", { required: "Platform is required." })}
        />
        {errors.platform && (
          <p style={{ color: "red" }}>{errors.platform.message}</p>
        )}

        <label>Genre</label>
        <input
          type="text"
          placeholder="E.g RPG, Action, Puzzle"
          {...register("genre", { required: "Genre is required." })}
        />
        {errors.genre && <p style={{ color: "red" }}>{errors.genre.message}</p>}

        <button type="submit" disabled={isPending}>
          {isPending ? "Creating..." : "Create"}
        </button>

        {error && <p style={{ color: "red" }}>{error.message}</p>}
      </form>
    </div>
  );
}

export default CreateGame;
