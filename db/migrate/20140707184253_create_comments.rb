class CreateComments < ActiveRecord::Migration
  def change
    create_table :comments do |t|
      t.references :commentable, polymorphic: true
      t.references :user
      t.text :description
      t.string :username

      t.timestamps
    end
  end
end
