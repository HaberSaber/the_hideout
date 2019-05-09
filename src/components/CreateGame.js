import React from "react";

class CreateGame extends React.Component {
  gangNameRef = React.createRef();
  // playerNameRef = React.createRef();

  createGame = () => {};

  searchForPlayer = event => {
    console.log(event.target.value);
  }

  render() {
    return (
      <div>
        <h2>New Game</h2>
        <form onSubmit={this.createGame}>
          <div className="form-group">
            <label htmlFor="gangName">Gang Name</label>
            <input
              className="form-control"
              type="text"
              ref={this.gangNameRef}
              name="gangName"
              placeholder="The Pineapple Gang"
            />
          </div>
          <div className="form-group">
            <label htmlFor="Add Player">Add Player</label>
            <input
              className="form-control"
              type="text"
              // ref={this.playerNameRef}
              name="playerName"
              placeholder="Mr. Knife McStabby"
              onChange={this.searchForPlayer}
            />
          </div>

          {/* TODO: Generate list of names matching the above input text, allow DMs to select the players from that list then */}

        </form>
      </div>
    );
  }
}

export default CreateGame;
