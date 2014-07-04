class CreateImprovements < ActiveRecord::Migration
  def change
    create_table :improvements do |t|
      t.string :title
      t.text :description
      t.belongs_to :user
      t.belongs_to :problem
      t.belongs_to :solution

      t.timestamps
    end
  end
end
