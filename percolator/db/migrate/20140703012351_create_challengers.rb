class CreateChallengers < ActiveRecord::Migration
  def change
    create_table :challengers do |t|
      t.string :title
      t.string :description
      t.belongs_to :user
      t.belongs_to :idea
      t.belongs_to :solution

      t.timestamps
    end
  end
end
