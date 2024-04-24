import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Label } from "./ui/label";

const CreateRepository = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [nameError, setNameError] = useState("");
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      const response = await fetch(`https://api.github.com/user/repos`, {
        method: "POST",
        headers: {
          Authorization: `token ${import.meta.env.VITE_REACT_APP_GITHUB_TOKEN}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: data.name,
          description: data.description,
          private: data.visibility === "private",
        }),
      });

      if (!response.ok) {
        if (response.status === 422) {
          const responseBody = await response.json();
          setNameError(responseBody.message);
        } else {
          throw new Error("Failed to create repository");
        }
      } else {
        setNameError("");
        alert("Repository created successfully!");
        navigate(-1);
      }
    } catch (error) {
      alert(`Error creating repository: ${error.message}`);
      console.error("Error creating repository:", error);
    }
  };

  const handleCancel = () => {
    navigate(-1);
  };

  return (
    <div className="flex flex-col w-full pt-20 items-center">
      <h2 className="text-3xl font-bold w-full text-center max-sm:text-xl mb-4">
        Create a New Repository
      </h2>
      <form
        className="flex flex-col items-center max-md:w-4/5 max-lg:w-3/5 lg:w-3/6 gap-4"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="w-full">
          <Label className="flex flex-col gap-2 justify-center text-base">
            Name:
            <Input
              placeholder="Name of project..."
              type="text"
              {...register("name", { required: true })}
            />
            {errors.name && (
              <span className="text-destructive">Name is required</span>
            )}
            {nameError && (
              <span className="text-destructive">{`${nameError} Name already exists.`}</span>
            )}
          </Label>
        </div>
        <div className="w-full">
          <Label className="flex flex-col gap-2 justify-center text-base">
            Description:
            <Textarea
              placeholder="Project description..."
              {...register("description")}
            />
          </Label>
        </div>
        <div className="self-start">
          <Label className="flex gap-2 text-base items-center">
            Visibility:
            <select
              className="bg-background transition-all ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 hover:border-violet-700 border-[1px] border-slate-500 rounded-sm p-1"
              {...register("visibility")}
            >
              <option value="public">Public</option>
              <option value="private">Private</option>
            </select>
          </Label>
        </div>
        <div className="w-full flex items-center justify-between gap-2 mt-[2rem]">
          <Button
            className="max-sm:text-sm"
            type="button"
            onClick={handleCancel}
          >
            Cancel
          </Button>
          <Button className=" max-sm:text-sm" type="submit">
            Create Repository
          </Button>
        </div>
      </form>
    </div>
  );
};

export default CreateRepository;
