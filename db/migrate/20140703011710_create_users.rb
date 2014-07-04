class CreateUsers < ActiveRecord::Migration
  def change
    create_table :users do |t|
      t.string :username
      # t.string :email #take this out for devise
      t.string :password_digest
      t.integer :reputation

      t.timestamps
    end
  end
end
