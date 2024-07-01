export const CreateAuthor = ({ onCreate }) => (
  <fieldset>
    <form onSubmit={onCreate}>
      <div>
        <label htmlFor="name">Name</label>
        <input id="name" name="name" />
      </div>
      <div>
        <label htmlFor="surname">Surname</label>
        <input id="surname" name="surname" />
      </div>
      <button>Create</button>
    </form>
  </fieldset>
);
