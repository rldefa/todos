class CreateTasks < ActiveRecord::Migration[6.0]
  def change
    create_table :tasks do |t|
      t.string :description, null: false
      t.string :category, null: false

      t.timestamps
    end
  end
end
