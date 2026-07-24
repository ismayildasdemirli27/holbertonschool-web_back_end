#!/usr/bin/env python3
"""Module for listing documents"""


def list_all(mongo_collection):
    """Return all documents in a collection"""
    return list(mongo_collection.find())
  
