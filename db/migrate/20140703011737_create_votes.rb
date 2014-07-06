class CreateVotes < ActiveRecord::Migration
  def change
    create_table :votes do |t|
      t.references :voteable,  polymorphic: true
      t.references :user
      t.boolean :vote_type

      t.timestamps
    end
  end
end
