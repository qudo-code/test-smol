<style global>
    @import "./styles/app.postcss";
</style>

<script lang="ts">
    type MentorApplication = {
        name: string;
        discord: string;
        twitter: string;
        portfolio: string;
        bio: string;
    };

    const data: MentorApplication = {
        bio: "",
        discord: "",
        name: "",
        portfolio: "",
        twitter: "",
    };

    let loading = false;

    const handleSubmit = async () => {
        loading = true;

        const url = import.meta.env.VITE_API_URL;

        try {
            await fetch(url + "/mentor-application", {
                body: JSON.stringify(data),
                headers: {
                    "Content-Type": "application/json",
                },
                method: "POST",
            });
        } catch (error) {
            // eslint-disable-next-line no-console
            console.log(error);
        } finally {
            loading = false;
        }
    };
</script>

<main>
    <div class="form-wrapper">
        <form
            on:submit|preventDefault={handleSubmit}
            class="border-red mx-auto w-full max-w-3xl"
        >
            <h2 class="text-xl font-bold">Application</h2>
            <input
                type="text"
                class="input w-full border-white"
                placeholder="Name"
                bind:value={data.name}
            />
            <input
                type="text"
                class="input w-full border-white"
                placeholder="Discord"
                bind:value={data.discord}
            />
            <textarea
                name=""
                id=""
                class="textarea w-full border-white"
                rows="10"
                placeholder="Bio"
            />
            <button
                type="submit"
                class="btn-primary btn"
                class:loading>Submit</button
            >
        </form>
    </div>
</main>
