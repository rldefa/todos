class Task < ApplicationRecord
    validates :description, presence: true
    validates :category, presence: true
end
