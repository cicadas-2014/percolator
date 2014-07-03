class CreateSolutions < ActiveRecord::Migration
  def change
    create_table :solutions do |t|
      t.string :title
      t.string :description
      t.belongs_to :user
      t.belongs_to :problem

      t.timestamps
    end
  end
end
